import requests
import base64
import json
import os
import random
import cv2
import numpy as np
import urllib
import sys
import shutil

'''
FLAGS:
    -p              -> use IP webcam on phone as capture device
    -r              -> apply random style
    -f [filepath]   -> use provided file as input
    -t [emotion]    -> pick a random image from the emotion for test
'''

flags = sys.argv
base_path = os.getcwd()

def print_help_message():
    print("\n\n\tpython test.py [flags]\n")
    print("\t[flags]:")
    print("\t\t-p              -> use IP webcam on phone as capture device")
    print("\t\t-r              -> apply random style")
    print("\t\t-f [filepath]   -> use provided file as input")
    print("\t\t-t [emotion]    -> pick a random image from the emotion for test")
    print()

def check_flag(flag):
    if flag in flags:
        return True
    return False

def get_filename():
    file_index = flags.index("-f") + 1
    if file_index < len(flags):
        return flags[file_index]
    else:
        print("\n\tSpecify filepath after -f flag")
        exit(0)    

def get_emotion_file():
    emotion_index = flags.index('-t') + 1
    if emotion_index < len(flags):
        emotion = flags[emotion_index]
        files = os.listdir(os.path.join("Examples/", emotion))
        file_num = random.randint(0, len(files)-1)
        return os.path.join(os.path.join("Examples", emotion), files[file_num])
    else:
        print("\n\tProvide an emotion to test: \n\t\tanger\n\t\tcontempt\n\t\tdisgust\n\t\tfear\n\t\thappiness\n\t\tneutral\n\t\tsadness\n\t\tsurprise")
        exit(0)    

def get_style(emotion):
    files = os.listdir(os.path.join("Styles/", emotion))
    file_num = random.randint(0, len(files)-1)
    print("Style Template pathname: ", os.path.join(os.path.join("Styles", emotion), files[file_num]))
    style_template = open(os.path.join(os.path.join("Styles", emotion), files[file_num]), 'rb')
    return style_template, os.path.join(os.path.join("Styles", emotion), files[file_num])

def stylize(content_image, style_template):
    url = "https://api.deepai.org/api/neural-style"
    response = requests.post(
                url,
                files={
                        'style': style_template,
                        'content': content_image,
                },
                headers={'api-key': '583e0dbc-44e0-460e-bf7e-972929020dfd'}
        )
    generated_image = open('generated_image.jpg','wb')
    #print("response.json(): ", response.json())
    generated_image.write(requests.get(response.json()['output_url']).content)
    generated_image.close()

    return generated_image

def hackItUp():
    if(check_flag("--help")):
        print_help_message()
        exit(0)
    filename = "content_image.jpg"
    #encoded_string = base64.b64encode(image_file.read())
    if(check_flag('-t')):
        shutil.copy(get_emotion_file(), filename)
    elif(check_flag("-f")):
        shutil.copy(get_filename(), filename)
    else:
        cam = cv2.VideoCapture(0)

        # cv2.namedWindow("test")

        img_counter = 0
        URL = "http://172.20.10.5:8080/shot.jpg"
        while True:
            if(check_flag("-p")):
                img_arr = np.array(bytearray(urllib.request.urlopen(URL).read()),dtype=np.uint8)
                img = cv2.imdecode(img_arr,-1)
                img = cv2.resize(img, (500, 500))
                cv2.imshow('HackItUp',img)
            else:
                ret, img = cam.read()
                img = cv2.resize(img, (500, 500))
                cv2.imshow("HackItUp", img)
                if not ret:
                    break

            k = cv2.waitKey(1)

            if k%256 == 27:
                # ESC pressed
                print("Escape hit, closing...")
                break
            elif k%256 == 32:
                # SPACE pressed
                img_name = filename
                cv2.imwrite(img_name, img)
                print("{} written!".format(img_name))
                break

        cam.release()
        cv2.destroyAllWindows()
    
    emotion = "random"
    content_image = open(filename, "rb")
    if(check_flag("-r") == False):
        r = requests.post(
            'http://max-facial-emotion-classifier.max.us-south.containers.appdomain.cloud/model/predict',
            files={
                'image': content_image
            }
        )
        content_image.close()
        if(len(((json.loads(r.content))["predictions"])) > 0):
            emotion = (((((json.loads(r.content))["predictions"])[0])["emotion_predictions"])[0])["label"]

        print("."*70)
        print("Emotion Predicted: ", emotion)
        print("."*70)
    
    style_template, applied_style_file = get_style(emotion)

    content_image = open(filename, "rb")
    stylize(content_image, style_template)
    content_image.close()

    content_image = cv2.imread("content_image.jpg", 1)
    content_image = cv2.resize(content_image, (500, 500))
    cv2.imshow("Content_image", content_image)

    style_image = cv2.imread(applied_style_file, 1)
    style_image = cv2.resize(style_image, (500, 500))
    cv2.imshow(emotion + "-style", style_image)


    generated_image = cv2.imread("generated_image.jpg", 1)
    generated_image = cv2.resize(generated_image, (500, 500))
    cv2.imshow("Generated_image", generated_image)

    cv2.waitKey(0)
    cv2.destroyAllWindows()
    
hackItUp()