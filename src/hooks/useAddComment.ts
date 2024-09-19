import { useMutation, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import { Artwork, Comment } from "../utils/types"; // Ensure these types are correctly defined
import { ArtworkService } from "../services";


const useAddComment = () => {
    const queryClient = useQueryClient();

    // Note the change here in the generic type parameters to reflect the actual return type from the service
    return useMutation<Artwork, AxiosError, { userId: string; artworkId: string; comment: Comment }>(
        ({ userId, artworkId, comment }) => ArtworkService.addComment(userId, artworkId, comment ),
        {
            onSuccess: () => {
                // Invalidate and refetch queries related to artworks
                queryClient.invalidateQueries(['artworks']); // Ensure this query key matches how you fetch artworks
            },
            onError: (error: AxiosError) => {
                console.error('Error adding comment:', error.message);
            }
        }
    );
};

export default useAddComment;
