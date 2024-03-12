export const items: Item[] = [];
type Item = {
    id: number;
    name: string;
};

for (let i = 1; i <= 100; i++) {
    items.push({ id: i, name: `Item ${i}` });
}

export const perPage = 10;

export const getItems = (req: any, res: any) => {
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    const paginatedItems = items.slice(startIndex, endIndex);

    res.json({
        page,
        perPage,
        totalItems: items.length,
        totalPages: Math.ceil(items.length / perPage),
        data: paginatedItems,
    });
};
