

const state = reactive({
    members: [] as string[]
})


export default () => {

    const { members } = toRefs(state);

    const addMember = (id: string) => {
        state.members = [...state.members, id]
    };
    const removeMember = (id: string) => {
        state.members = state.members.filter(member => member !== id);
    };
    const setMembers = (ids: string[]) => {
        state.members = ids
    };

    return {
        members,
        addMember,
        removeMember,
        setMembers
    }

}