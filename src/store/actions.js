import {
    getBaseCategoryList,
    getBanners,
    getFloors
} from 'http/http.js'

export default {
    async test() {
        const body = await getBaseCategoryList();
        console.log(body.data);
        const banners = await getBanners();
        console.log(banners);
        const floors = await getFloors();
        console.log(floors);
    }
}