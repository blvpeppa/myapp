const express = require('express');
  const app = express();
  const port = process.env.port || 6000
  app.get('/',(req,res) => {
res.send("hello world");
  });
  try {
  app.listen(port,()=>{
    console.log(`server running on port ${port}` );
  });
}
catch (error) {
    console.log("port in use:" + port);
}
throw(error);