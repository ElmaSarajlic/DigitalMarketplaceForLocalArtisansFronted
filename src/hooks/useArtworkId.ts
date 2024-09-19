import { useQuery } from "react-query";
import { ArtworkService } from "../services";
import { Artwork } from "../utils/types";

interface ApiError {
    message: string;
}  

const useArtwork = (id: string) => {
    return useQuery<Artwork, ApiError>(['artwork', id],
        () => ArtworkService.getArtworkById(id)
    );
}

export default useArtwork;