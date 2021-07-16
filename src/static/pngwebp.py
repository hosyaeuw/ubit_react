import os
from PIL import Image

file = 'result.jpg'
filename = ''.join(file.split('.')[:-1])
Image.open(file).convert('RGB').save(f'{filename}.webp', 'webp')

# from PIL import Image
 
# def resize_image(input_image_path,
#                  output_image_path,
#                  size):
#     original_image = Image.open(input_image_path)
#     width, height = original_image.size
#     print('The original image size is {wide} wide x {height} '
#           'high'.format(wide=width, height=height))
 
#     resized_image = original_image.resize(size)
#     width, height = resized_image.size
#     print('The resized image size is {wide} wide x {height} '
#           'high'.format(wide=width, height=height))
#     resized_image.show()
#     resized_image.save(output_image_path)
 
# if __name__ == '__main__':
#     file = 'tancevalnaja_komanda_united_bit_gazprom_transgaz_uhta.webp'
#     resize_image(input_image_path=file,
#                  output_image_path=f'small_{file}',
#                  size=(500, 333))