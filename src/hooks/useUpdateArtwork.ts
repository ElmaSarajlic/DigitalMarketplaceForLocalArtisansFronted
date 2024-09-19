import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Artwork } from '../utils/types';
import { ArtworkService } from '../services';

const useUpdateArtwork = () => {
  const queryClient = useQueryClient();
  return useMutation<Artwork, AxiosError, { id: string; artwork: Artwork }>(
    ({ id, artwork }) => ArtworkService.updateArtwork(id, artwork),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    }
  );
};

export default useUpdateArtwork;
