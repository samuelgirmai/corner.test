Usage
=====
- Install artillery globally
$ npm install -g artillery

- You are ready to run your first load test now!

- Run a quick test
$ artillery quick --count 10 -n 20 https://artillery.io/


- EMR load test scripts for each micro service are located inside ./scripts/*

- To run EMR load test scripts

$ artillery run <file>

- To Log server responses, for debugging purpose; add the following line to scripts after "url" field.
   "post": {
      "url": "/app/emr/practner/patient/record/write",
      "afterResponse": "log_response",
       ...
    }
