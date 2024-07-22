import requests

endpoint = 'http://127.0.0.1:8000/auth/login/' 

# data = {
#     "firstname": "Behrad",
#     "lastname": "Afsharipour",
#     "username": "Behradahp",
#     "email": "beh.afsharipor@gmail.com",
#     "phone": "09015820571",
#     "password": "MADRIDista1379",
#     "is_admin": False,
# }

data = {
    "username": "Behradahp",
    "password": "MADRIDista1379",
}

response = requests.post(endpoint, json=data)

print(response.json())