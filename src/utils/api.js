const api =
    import.meta.env.VITE_LINK_API;

export const apiStore = async (value) => {
    const response = await fetch(`${api}?url=${value}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
        },
        body: JSON.stringify({
            value,
        }),
    });

    const data = await response.json();
    if (data.ok === true) {
        return data;
    }
    return null;
}