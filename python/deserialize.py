import pickle,base64

import pickle, base64
payload = input("PAYLOAD= ")
serialdata = base64.b64decode(payload)
deserialdata = pickle.loads(serialdata)
print(dir(deserialdata))
