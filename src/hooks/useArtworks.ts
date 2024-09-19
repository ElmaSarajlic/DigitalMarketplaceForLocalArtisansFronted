import { useQuery } from "react-query";
import { ArtworkService } from "../services";
import { Artwork } from "../utils/types";

interface ApiError {
    message: string;
}  

const useArtworks = () => {
    return useQuery<Artwork[], ApiError>('artwork',
        () => ArtworkService.getallArtworks(),
    );
}


export default useArtworks