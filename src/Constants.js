// Setup App Config
const dev = {
    API_URL: process.env.NODE_ENV === "development" ? "http://localhost:4000" : "",
}

const prod = {
    API_URL: "",
}

export const config = process.env.NODE_ENV === "development" ? dev : prod
