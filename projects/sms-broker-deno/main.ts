import { SerialPort } from "npm:serialport";
import * as zx from "npm:zx";

// Create a port
const port = new SerialPort({
  //   path: '/dev/tty-usbserial1',
  path: "COM10",
  baudRate: 460800,
});
// Open errors will be emitted as an error event
port.on("error", function (err) {
  console.log("Error: ", err.message);
  port.close();
});

const availablePortList = await SerialPort.list();
console.log("availablePortList:", availablePortList);

console.log("isOpen:", port.isOpen);

// console.log("read:", port.read());
console.log("writing...AT\n");
// port.write("AT\n");
// console.log("read:", port.read());

port.write("AT", function (err) {
  if (err) {
    return console.log("Error on write: ", err.message);
  }
  console.log("message written");
});

console.log('before awaiting...');

await pauseMS(5000);

console.log('awaited...');

port.isOpen && port.close();

function pauseMS(ms: number) {
  return new Promise<true>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}
