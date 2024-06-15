export const buildProducts = (rows) => {
    const groups = [];
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        let gIndex = groups.findIndex( g => g.group === row['nomlinea'] );
        if(gIndex === -1){ 
            groups.push({
                group: row['nomlinea'],
                products: []
            });
            gIndex = groups.length - 1;
        }
        if(groups[gIndex].products.findIndex(p => p.codigo === row['codigo']) === -1) groups[gIndex].products.push({...row});
    }

    return groups;
}