from docxtpl import DocxTemplate
import subprocess
import re

def docx_to_pdf(infile_path):
    if infile_path[-5:] != '.docx':
        raise Exception('input file must be a .docx')

    result = subprocess.run(
            ['soffice', '--headless', '--convert-to', 'pdf', infile_path],
            stdout=subprocess.PIPE)
    print(result.stdout.decode('utf-8'))

def gen_docx(infile_path, outfile_path, data):
    if infile_path[-5:] != '.docx':
        raise Exception('input file must be a .docx')
    if outfile_path[-5:] != '.docx':
        raise Exception('output file must be a .docx')

    doc = DocxTemplate(infile_path)

    context = {
            'shareholder_name' : data['name'],
            'shareholder_id': data['shareholder_id'],
            'n_shares': data['n_shares'],
            'n_authorized_shares': data['n_authorized_shares'],
            }
    context['n_total_shares'] = context['n_authorized_shares'] + context['n_shares']

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
    data = {
            'name' : 'Nguyễn Bá Xuân Bảng',
            'shareholder_id': 'FPT.1234',
            'n_shares': 2000,
            'n_authorized_shares': 14000,
            }
    gen_pdf('./Mau_phieu_TA.docx', 'mau_TA.pdf', data)
    gen_pdf('./Mau_phieu_TV.docx', 'mau_TV.pdf', data)

