import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiFetch } from '@/shared/api';

import { movieKeys } from './keys';

export const useToggleWatchlist = (accountId: string | null) => {
  const queryClient = useQueryClient();

  if (!accountId) {
    throw new Error("'accountId' is required to toggle watchlist");
  }

  return useMutation({
    mutationFn: ({ movieId, isCurrentlyInWatchlist }: { movieId: number; isCurrentlyInWatchlist: boolean }) =>
      apiFetch(`/account/${accountId}/watchlist`, {
        method: 'POST',
        body: JSON.stringify({
          media_type: 'movie',
          media_id: movieId,
          watchlist: !isCurrentlyInWatchlist,
        }),
      }),

    onMutate: async ({ movieId, isCurrentlyInWatchlist }) => {
      const stateKey = [...movieKeys.details(movieId.toString()), 'state', accountId];

      await queryClient.cancelQueries({ queryKey: stateKey });
      const previousState = queryClient.getQueryData(stateKey);

      queryClient.setQueryData(stateKey, (old: any) => ({
        ...old,
        watchlist: !isCurrentlyInWatchlist,
      }));

      return { previousState, stateKey };
    },

    onError: (_err, _variables, context) => {
      if (context?.stateKey) {
        queryClient.setQueryData(context.stateKey, context.previousState);
      }
    },

    onSettled: (_data, _error, { movieId }) => {
      queryClient.invalidateQueries({ queryKey: movieKeys.watchlist(accountId) });
      queryClient.invalidateQueries({
        queryKey: [...movieKeys.details(movieId.toString()), 'state', accountId]
      });
    },
  });
};