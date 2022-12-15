const BASE_URL = "http://localhost:8001";

const getExamplesFromUser = async (email) => {
    const res = await fetch(`${BASE_URL}/examples/filter/${email}`);
    return res.json();
};

const deleteExample = async (id) => {
    console.log(BASE_URL + "/examples/" + id);
    const res = await fetch(BASE_URL + "/examples/" + id, { method: 'DELETE' });
}

export { getExamplesFromUser };
export { deleteExample };