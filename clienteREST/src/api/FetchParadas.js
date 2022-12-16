const BASE_URL = "http://pabloexamenweb.ddns.net:8001";

const getParadasLineaSentido = async (codLinea, sentido) => {
    const res = await fetch(`${BASE_URL}/paradas/filter/${codLinea}/${sentido}`);
    return res.json();
};

export { getParadasLineaSentido };
