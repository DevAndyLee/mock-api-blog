const API_LAG = 100;

const sendLag = (res, data) => {
  setTimeout(() => res.send(data), API_LAG);
}

export const cors = (req, res) => {
  res.setHeader('Cache-Control', 'max-age=0');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  if (req.headers.origin) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }
}

export const send = (req, res, value) => {
  cors(req, res);
  sendLag(res, value);
}

export const error = (req, res, status, error) => {
  console.log(`ERROR: ${status} - ${error}`);

  cors(req, res);
  res.status(status);
  sendLag(res, error);
}
