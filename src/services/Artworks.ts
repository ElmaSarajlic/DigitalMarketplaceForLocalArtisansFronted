import { Artwork, Comment} from "../utils/types";
import appAxios from "./AppAxios";

const getallArtworks = async (): Promise<Artwork[]> => {
    return appAxios.get(`/artworks/`).then(
        (response) => {
            const data = response.data;
            console.log(data);
  
            return data;
        }).catch((error) => {
            console.error("Error:", error.message);
            throw error; 
        });
  }

  const getArtworkById = async (id: string): Promise<Artwork> => {
    console.log(`Fetching artwork with ID: ${id}`);
    
    return appAxios.get(`/artworks/${id}`).then((response) => {
        const data = response.data;
  
        return data;
    }).catch((error) => {
        console.log( error.message);
        throw error;
    });
};

const CreateArtwork = async (artwork: Artwork): Promise<Artwork[]> => {
    return appAxios.post('/artworks/', artwork).then(
        (response) => {
            const data = response.data;
            console.log(response);
            console.log(artwork.title);
            console.log(data);
  
            return data;
        }).catch((error) => {
            console.error("Error:", error.message);
            throw error;
        });
  }

  const getArtworksByCategory = async (categoryName: string): Promise<Artwork[]> => {
    return appAxios.get(`/artworks/category/${categoryName}`).then(
        (response) => response.data
    );
};

const deleteArtwork = async (id: string): Promise<void> => {
    console.log(`Deleting artwork with ID: ${id}`);
    
    return appAxios.delete(`/artworks/${id}`).then(() => {
      console.log('Artwork deleted successfully');
    }).catch((error) => {
      console.error('Error deleting artwork:', error);
      throw error; 
    });
}

const updateArtwork = async (id: string, artwork: Artwork): Promise<Artwork> => {
    return appAxios.put(`/artworks/${id}`, artwork).then((response) => {
      const data = response.data;
      console.log(data);
  
      return data;
    });
  }

  const addComment = async ( userId: string,artworkId: string, comment: Comment): Promise<Artwork> => {
        return appAxios.post(`/artworks/${userId}/${artworkId}/comments`,  comment ).then(
        (response) => {
            const data = response.data;
            console.log(response);
            console.log(data);
  
            return data;
        }).catch((error) => {
            console.error("Error:", error.message);
            throw error;
        });
}
const getallComments = async (artworkId: string): Promise<Comment[]> => {
    return appAxios.get(`/artworks/${artworkId}/comments`).then(
        (response) => {
            const data = response.data;
            console.log(data);
  
            return data;
        }).catch((error) => {
            console.error("Error:", error.message);
            throw error; 
        });
  };


  export default {getallArtworks, getArtworkById, CreateArtwork, getArtworksByCategory, deleteArtwork, updateArtwork, addComment, getallComments}
  