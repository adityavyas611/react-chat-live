const users = [];

export const addUser = ({ id, name, room }) => {
    name = name.toLowerCase().trim();
    room = room.toLowerCase().trim();

    const existingUser = users.find((user) => user.name === name && user.room === room);

    if (existingUser) {
        return { error: 'Username is taken' };
    }

    const user = { id, name, room };
    users.push(user);

    return { user };
};

export const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1) {
        return users.splice(index , 1)[0];
    }
};

export const getUser = (id) => users.find((user) => user.id === id);

export const getUserInRoom = (room) => {
    users.filter((user) => user.room === room);
};
