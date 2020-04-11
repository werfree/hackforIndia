import requests
import folium
import webbrowser
def mapFolium(ids,count):
    m = folium.Map()
    for i in range(0,len(ids)):
        folium.Marker(ids[i].split(),tooltip="No of Accident = "+str(count[i]),popup=ids[i].split()).add_to(m)
    m.save("accident.html")


URL = "http://169.254.95.205:3000/post"


r = requests.get(url = URL)
ids=[]
count=[]
data = r.json()
print(data)


if(data['status'] == "OK"):
    result = data['result']
    for i in range(0,len(result)):
        d = result[i]
        ids.append(d['_id'])
        count.append(d['count'])
    mapFolium(ids,count)
    webbrowser.open_new_tab("accident.html")
else:
    print("Error")
