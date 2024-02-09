const apiUrl = import.meta.env.VITE_API_URL;

async function getArticle(dic, query) {
    const url = `${apiUrl}/${dic}?word=${encodeURIComponent(query)}`;
    console.log(url);
    try {
        const resp = await fetch(url);
        const data = await resp.text();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export default getArticle;