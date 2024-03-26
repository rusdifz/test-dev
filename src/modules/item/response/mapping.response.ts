import { ItemsInterface } from "../interface/item.interface";

export async function itemResp(data:any): Promise<ItemsInterface[]>{

    const resp: ItemsInterface[] = await Promise.all(data.map((dt:any)=>{
        return {
            item_id: Number(dt.item_id),
            item_name: dt.item_name, 
            category: dt.category
        }
    }))

    return resp

}