import { useMutation, useQueryClient } from "react-query";
import { Artwork } from "../utils/types";
import { ArtworkService } from "../services";


const useCreateArtwork = () => {
    const queryClient = useQueryClient();
    return useMutation((data: Artwork) => ArtworkService.CreateArtwork(data), {
        onSuccess: () => {
            queryClient.invalidateQueries('artworks');
            

        },
    });
 };

export default useCreateArtwork;
