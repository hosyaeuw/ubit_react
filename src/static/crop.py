# from PIL import Image

# im = Image.open('./luxfon.com-35100.jpg')
# width, height = im.size
# need_width, need_height = (400, 250)
# top = (height - need_height) / 2
# left = (width - need_height) / 2
# im1 = im.crop((left, top, left + need_width, height - need_height))
# im1.show()

from PIL import Image
filename = 'small_tancevalnaja_komanda_united_bit_gazprom_transgaz_uhta.webp'
im = Image.open(filename)
width, height = im.size
need_width, need_height = (width, 600)
# top = (height - need_height) / 2
# left = (width - need_height) / 2
top = 40
left = 0
im1 = im.crop((left, top, need_width, need_height))
im1.show()
im1.save(filename)