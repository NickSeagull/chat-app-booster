import React, { useState } from 'react';
import './App.css';
import { useQuery, gql, useSubscription, useMutation } from '@apollo/client';

const GET_ROOMS_QUERY = gql`
query {
  RoomReadModels {
      id
      name
      participantsCount
  }
}
`

const GET_ROOMS_SUBSCRIPTION = gql`
subscription {
  RoomReadModels {
      id
      name
      participantsCount
  }
}
`

const JOIN_ROOM_MUTATION = gql`
  mutation joinRoom($username: String!, $roomID: ID!) {
    JoinRoom(input: {
      username: $username
      roomID: $roomID
    })
  }
`;

interface JoinRoomVars {
  username: string
  roomID: string
}

interface Room {
  id: string
  name: string
  participantsCount: number
}

interface RoomsData {
  RoomReadModels: Array<Room>
}

interface AppProps {}

function App({}: AppProps) {
  const [name, setName] = useState("Anonymous User")
  const [selectedRoom, setSelectedRoom] = useState("")
  const { loading, data } = { loading: true, data: null} /*useQuery<RoomsData>(
    GET_ROOMS_QUERY,
    { pollInterval: 500 }
  );
  */
  const [joinRoom, { error }] = useMutation<{input: JoinRoomVars}>(JOIN_ROOM_MUTATION, {
    variables: { username: name, roomID: selectedRoom }
  });
  return (
    <div className="App">
      <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">
        Welcome, {name}! {" "}
        <span>👋</span>
      </h1>
      <p>Type your name</p>
      <input
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 mb-4"
        type="text"
        onChange={(e) => setName(e.target.value) }/>
      <h2 className="text-xl mb-4">Rooms <span>🚪</span></h2>
      {
        loading? Loader() : (
          <ul>
            {/* { data && data.RoomReadModels.map((room) =>
            (
              <li id={room.id}>
                <b>{room.name}</b> - Participants: {room.participantsCount}
                <button onClick={() => {
                  setSelectedRoom(room.id)
                  joinRoom()
                }}>{" + "}</button>
              </li>
            ))} */}
          </ul>
        )
      }
      </div>
    </div>
  );
}

export default App;
function Loader(): React.ReactNode {
  return (
<div className="text-center py-4 lg:px-4">
  <div className="p-2 animate-pulse bg-indigo-800 items-center text-indigo-100 leading-none rounded-full flex inline-flex" role="alert">
    <span className="font-semibold mx-4 text-center flex-auto">Loading</span>
  </div>
</div>
  );
}
