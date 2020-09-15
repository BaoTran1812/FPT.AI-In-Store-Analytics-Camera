from docxtpl import DocxTemplate, InlineImage
from docx.shared import Mm
import subprocess
import qrcode
import re
import sys

def docx_to_pdf(infile_path):
    if infile_path[-5:] != '.docx':
        raise Exception('input file must be a .docx')

    result = subprocess.run(
            ['/Applications/LibreOffice.app/Contents/MacOS/soffice', '--headless', '--convert-to', 'pdf', infile_path],
            stdout=subprocess.PIPE)
    print(result.stdout.decode('utf-8'))

def gen_docx(infile_path, outfile_path, data):
    if infile_path[-5:] != '.docx':
        raise Exception('input file must be a .docx')
    if outfile_path[-5:] != '.docx':
        raise Exception('output file must be a .docx')

    doc = DocxTemplate(infile_path)
    doc.replace_pic('dummy.jpg', f'{data["uid"]}.jpg')

    context = {
            'shareholder_name' : data['name'],
            'user_id': data['shareholder_id'],
            'n_shares': data['n_shares'],
            }

    doc.render(context)
    doc.save(outfile_path)

def gen_pdf(infile_path, outfile_path, data):
    if infile_path[-5:] != '.docx':
        raise Exception('input file must be a .docx')
    if outfile_path[-4:] != '.pdf':
        raise Exception('output file must be a .pdf')

    intermediate_docx_file_path = re.sub('.pdf$', '.docx', outfile_path)
    gen_docx(infile_path, intermediate_docx_file_path, data)
    docx_to_pdf(intermediate_docx_file_path)

if __name__ == '__main__':
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=6,
        border=0,
    )
    uid = '5e7353f1679314060b546105'
    qr.add_data(f'https://agm.fpt.com.vn/qr/{uid}')
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img.save(f'{uid}.jpg')
    data = {
            'name' : 'Nguyễn Thị Hải Hằng',
            'shareholder_id': 'FPT001484',
            'n_shares': 500,
            'uid': uid,
            }
    gen_pdf('./phieu_bieu_quyet_TV.docx', 'mau_TV.pdf', data)
    gen_pdf('./phieu_bieu_quyet_TA.docx', 'mau_TA.pdf', data)


