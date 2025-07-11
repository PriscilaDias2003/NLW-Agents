import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRoomRequest } from "./types/create-room-request";
import type { CreateRoomResponse } from "./types/create-room-response";

// Do react-query usar mutation sempre que for para POST, PUT, DELETE
// useQuery apenas quando for listagem

export function useCreateRoom() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: CreateRoomRequest) => {
            const response = await fetch('http://localhost:3333/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result: CreateRoomResponse = await response.json()

            return result
        },

        onSuccess: () => {
            // invalidateQueries refaz todas as queries com essa key
            // é um refresh quando a querie da sucesso
            queryClient.invalidateQueries({ queryKey: ['get-rooms'] })
        }
    })
}