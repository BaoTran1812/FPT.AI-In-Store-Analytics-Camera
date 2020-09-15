from docxtpl import DocxTemplate, InlineImage
from docx.shared import Mm
import subprocess
import qrcode
import re
import requests
import sys
import os

DEBUG = False
LIBREOFFICE_BIN = 'soffice'
#  LIBREOFFICE_BIN = '/Applications/LibreOffice.app/Contents/MacOS/soffice'
PDF_OUTDIR = './ballot/generated'
QRCODE_DIR = './ballot/qrcode'
TEMPLATE_VI = './ballot/templates/phieu_bieu_quyet_TV.docx'
TEMPLATE_EN = './ballot/templates/phieu_bieu_quyet_TA.docx'


def docx_to_pdf(infile_path):
    if infile_path[-5:] != '.docx':
        raise Exception('docx_to_pdf: input file must be a .docx')

    result = subprocess.run(
            [LIBREOFFICE_BIN, '--headless', '--convert-to', 'pdf', '--outdir', PDF_OUTDIR, infile_path],
            stdout=subprocess.PIPE)
    if DEBUG:
        print(result.stdout.decode('utf-8'))

def gen_docx(infile_path, outfile_path, data):
    if infile_path[-5:] != '.docx':
        raise Exception('gen_docx: input file must be a .docx')
    if outfile_path[-5:] != '.docx':
        raise Exception('gen_docx: output file must be a .docx')

    doc = DocxTemplate(infile_path)
    doc.replace_pic('dummy.jpg', QRCODE_DIR + '/' + data["uid"] + '.jpg')

    context = {
            'shareholder_name' : data['name'],
            'user_id': data['shareholder_id'],
            'n_shares': data['n_shares'],
            }

    doc.render(context)
    doc.save(outfile_path)
    return data['name']

def gen_pdf(infile_path, outfile_path, data):
    if infile_path[-5:] != '.docx':
        raise Exception('gen_pdf: input file must be a .docx')
    if outfile_path[-4:] != '.pdf':
        raise Exception('gen_pdf: output file must be a .pdf')

    intermediate_docx_file_path = re.sub('.pdf$', '.docx', outfile_path)
    name = gen_docx(infile_path, intermediate_docx_file_path, data)
    docx_to_pdf(intermediate_docx_file_path)
    os.remove(intermediate_docx_file_path)
    return outfile_path, name

def gen_vote_document(shareholder_id, mongo_uid, cmt, en=False):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=6,
        border=0,
    )
    qr.add_data('https://agm.fpt.com.vn/qr/' + mongo_uid)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(QRCODE_DIR + '/' + mongo_uid + '.jpg')

    url = 'http://fpt-agm.k8s.bcnfpt.com/info?id=' + shareholder_id + '&cmt=' + cmt
    r = requests.get(url)
    try:
        r = r.json()
    except Exception as e:
        raise Exception('response from Hiep\'s API was not a JSON')

    if r.get('name') is None or r.get('stock') is None:
        raise Exception('shareholder not found')

    data = {
            'name' : r['name'],
            'shareholder_id': shareholder_id,
            'n_shares': r['stock'],
            'uid': mongo_uid
            }

    if en:
        outfile_path, name = gen_pdf(TEMPLATE_EN, PDF_OUTDIR + '/' + mongo_uid + '.pdf', data)
    else:
        outfile_path, name = gen_pdf(TEMPLATE_VI, PDF_OUTDIR + '/' + mongo_uid + '.pdf', data)

    return outfile_path, name


if __name__ == '__main__':
    if len(sys.argv) < 5:
        print('{ "error": "not enough argv" }')
    else:
        shareholder_id = sys.argv[1]
        mongo_uid = sys.argv[2]
        cmt = sys.argv[3]
        en = sys.argv[4] == 'en'
        try:
            res, name = gen_vote_document(shareholder_id, mongo_uid, cmt, en)
            print('{ "pdf": "' + res + '", "name": "' + name + '" }')
        except Exception as e:
            print('{ "error": "' + str(e) + '" }')
    sys.stdout.flush()

