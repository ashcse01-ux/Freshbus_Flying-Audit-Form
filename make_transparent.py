from PIL import Image

def process():
    img = Image.open('logo.webp').convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # threshold for black
    for item in datas:
        if item[0] < 20 and item[1] < 20 and item[2] < 20:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save('logo.webp', "WEBP")

process()
