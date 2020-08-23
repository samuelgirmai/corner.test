import license from "./license.js";

const config = {
 auth: {
    license: license
  },
  proxy: {
    url: "https://localhost:22000"
  },
  stream: {
    url: "https://localhost:22003"
    
} 
};

export default config;

