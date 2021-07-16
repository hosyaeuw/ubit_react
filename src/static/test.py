from PIL import Image, ImageDraw 

image = Image.open('123.jpg')  # Открываем изображение
draw = ImageDraw.Draw(image)  # Создаем инструмент для рисования
width = image.size[0]  # Определяем ширину
height = image.size[1]  # Определяем высоту
pix = image.load()  # Выгружаем значения пикселей


for x in range(width):
    for y in range(height):
        r = pix[x, y][0] #узнаём значение красного цвета пикселя
        g = pix[x, y][1] #зелёного
        b = pix[x, y][2] #синего
        sr = (r + g + b) // 3 #среднее значение

        if sr < 200:
        	# draw.point((x, y), (255, 255, 255)) #рисуем пиксель
        	draw.point((x, y), (24, 23, 22)) #рисуем пиксель

image.show()
image.save("result123.jpg", "JPEG") 
	