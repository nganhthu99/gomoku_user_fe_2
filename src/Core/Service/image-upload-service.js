import axios from "axios";

export const imgurUploadImageService = async (image) => {
    return axios.post("https://api.imgur.com/3/image", {
        image: image,
    }, {
        headers: {
            Authorization: 'Client-ID ' + '71c54a406b19b36',
        }
    })
}
