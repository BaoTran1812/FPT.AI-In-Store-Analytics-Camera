import qrcode
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_M,
    box_size=5,
    border=0,
)
qr.add_data(f'https://google.com')
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white")
img.save(f'dummy.jpg')
