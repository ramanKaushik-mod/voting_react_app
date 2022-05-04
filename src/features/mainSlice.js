import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const getEndPoint = (endPoint) => `http://localhost:5000/${endPoint}/`

const p = (data) => console.log(data)


// T H U N K S

//SignUp thunks


export const addCreatorThunk = createAsyncThunk(
    'main/addCreator',
    async (stringifiedData) => {
        return await fetch(getEndPoint('creatorSignUp'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringifiedData
        }).then((res) => {
            return res.json()
        })
    }
)

export const getCreatorThunk = createAsyncThunk(
    'main/getCreator',
    async (stringifiedData) => {
        return await fetch(getEndPoint('creatorSignIn'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringifiedData
        }).then((res) => {
            return res.json()
        })
    }
)


//SignIn thunks

export const addVoterThunk = createAsyncThunk(
    'main/addVoter',
    async (stringifiedData) => {
        return await fetch(getEndPoint('voterSignUp'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringifiedData
        }).then(res => {
            return res.json()
        })
    }
)

export const getVoterThunk = createAsyncThunk(
    'main/getVoter',
    async (stringifiedData) => {
        return await fetch(getEndPoint('voterSignIn'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringifiedData
        }).then(res => {
            return res.json()
        })
    }
)

//poll thunks


export const addPollDetailsThunk = createAsyncThunk(
    'poll/addPollDetails',
    async (stringifiedData) => {
        return await fetch(getEndPoint('addPIDs'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringifiedData
        }).then(res => {
            return res.json()
        })
    }
)

export const addCandidateThunk = createAsyncThunk(
    'poll/addCandidate',
    async (stringifiedData) => {
        return await fetch(getEndPoint('addCandidate'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringifiedData
        }).then(res => {
            return res.json()
        })
    }
)
export const getPollDetailsThunk = createAsyncThunk(
    'poll/getPollDetails',
    async (stringifiedData) => {
        return await fetch(getEndPoint('getPollDetails'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringifiedData
        }).then(res => {
            return res.json()
        })
    }
)


export const getVSPS_THUNK = createAsyncThunk(
    'poll/getVSPS',
    async (stringifiedData) => {
        return await fetch(getEndPoint('vsps2'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringifiedData
        }).then(res => {
            return res.json()
        })
    }
)


// voter thunks

export const getGlobalPIDSList = createAsyncThunk(
    'voter/getGlobalPIDS',
    async () => {
        return await fetch(getEndPoint('gGPIDS'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => {
            return res.json()
        })
    }
)

export const getVoterPIDS = createAsyncThunk(
    'voter/getVoterPIDS',
    async (stringifiedData) => {
        return await fetch(getEndPoint('gVPIDS'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringifiedData
        }).then(res => {
            return res.json()
        })
    }
)

export const addVoterPIDS = createAsyncThunk(
    'voter/addVoterPIDs',
    async (stringifiedData) => {
        return await fetch(getEndPoint('addVPIDs'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringifiedData
        }).then(res => {
            return res.json()
        })

    }
)

export const getPoll = createAsyncThunk(
    'voter/getPoll',
    async (stringifiedData) => {
        return await fetch(getEndPoint('poll'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringifiedData
        }).then(res => {
            return res.json()
        })
    }
)

export const gpdfvTHUNK = createAsyncThunk(
    'voter/gpdfvTHUNK',
    async (stringifiedData) => {
        return await fetch(getEndPoint('gpdfv'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringifiedData
        }).then(res => {
            return res.json()
        })
    }
)

export const votingTHUNK = createAsyncThunk(
    'voter/votingTHUNK',
    async (stringifiedData) => {
        return await fetch(getEndPoint('voting'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: stringifiedData
        }).then(res => {
            return res.json()
        })
    }
)




const initialState = {
    userType: '',
    dashView: 0,
    isSignedIn: false,
    isPending: false,

    regStatus: 0,
    creator: {},

    authStatus: 0,
    voter: {},

    pollRegStatus: 0,
    pid: null,

    candidateStatus: 0,

    pollData: [],
    pollDetailsStatus: 0,

    vsps: [],
    vspsStatus: 0,

    // navigation specific
    toPolls: false,

    // voter specific

    gGPIDS: [],
    gGPIDSstatus: 0,

    gVPIDS: [],
    gVPIDSstatus: 0,

    addPIDStatus: 0,

    poll: {},
    pollStatus: 0,

    gpdfv: [],
    gpdfvStatus: 0,

    voteStatus:0,

    error: false
}


const mainSlice = createSlice({
    name: 'main',
    initialState: initialState,
    reducers: {
        logIn: (state) => {
            state.isSignedIn = true
        },
        logOut: (state) => {
            state.isSignedIn = false
            state.creator = {}
            state.voter = {}
        },
        setDashView: (state, action) => {
            state.dashView = action.payload
        },
        resetRegStatus: (state) => {
            state.regStatus = 0
        },
        resetAuthStatus: (state) => {
            state.authStatus = 0
        },
        turnPidNull: (state) => {
            state.pid = null
        },
        resetPollRegStatus: (state) => {
            state.pollRegStatus = 0
            console.log('poll reg status is : ', state.pollRegStatus)
        },
        handleToPolls: (state, action) => {
            state.toPolls = action.payload
        },
        manageAfterSubscribe: (state) => {
            state.pollStatus = 0
            state.poll = {}
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(addCreatorThunk.pending, (state) => {
                console.log('pending')
                state.isPending = true
            })
            .addCase(addCreatorThunk.fulfilled, (state, action) => {
                state.regStatus = action.payload.res
                state.isPending = false
            })
            .addCase(addCreatorThunk.rejected, (state, action) => {
                state.regStatus = action.payload.res
                state.isPending = false
                state.error = true
            })      // Handling Creators Signup above

            .addCase(getCreatorThunk.pending, (state) => {
                state.isPending = true
            })
            .addCase(getCreatorThunk.fulfilled, (state, action) => {
                if (action.payload.res === 200) {
                    state.userType = 'c'
                    state.voter = {}
                    state.creator = action.payload.body
                    state.dashView = 0
                    state.isSignedIn = true
                }
                state.authStatus = action.payload.res
                state.isPending = false

            })
            .addCase(getCreatorThunk.rejected, (state, action) => {
                state.authStatus = action.payload.res
                state.isPending = false
                state.error = true

            })      // Handling Creator Signin above

            .addCase(addVoterThunk.pending, (state) => {
                state.isPending = true
            })
            .addCase(addVoterThunk.fulfilled, (state, action) => {
                state.regStatus = action.payload.res
                state.isPending = false
            })
            .addCase(addVoterThunk.rejected, (state, action) => {
                state.regStatus = action.payload.res
                state.isPending = false
                state.error = true
            })      // Handling Voter SignUp above

            .addCase(getVoterThunk.pending, (state) => {
                state.isPending = true
            })
            .addCase(getVoterThunk.fulfilled, (state, action) => {
                if (action.payload.res === 200) {
                    state.userType = 'v'
                    state.creator = {}
                    state.voter = action.payload.body
                    state.dashView = 0
                    state.isSignedIn = true
                }
                state.authStatus = action.payload.res
                state.isPending = false

            })
            .addCase(getVoterThunk.rejected, (state, action) => {
                state.authStatus = action.payload.res
                state.isPending = false
                state.error = true

            })      // Handling Voter Sign In
            .addCase(addPollDetailsThunk.pending, (state) => {
                console.log('pending')
                state.isPending = true
            }).addCase(addPollDetailsThunk.fulfilled, (state, action) => {
                state.pollRegStatus = action.payload.res
                if (action.payload.res === 200) {
                    state.pid = action.payload.pid
                }
                state.isPending = false
            }).addCase(addPollDetailsThunk.rejected, (state, action) => {
                state.pollRegStatus = action.payload.res
                state.isPending = false
                state.error = true
            })      // registering poll details above
            .addCase(addCandidateThunk.pending, (state) => {
                state.isPending = true
            })
            .addCase(addCandidateThunk.fulfilled, (state, action) => {
                state.candidateStatus = action.payload.res
                state.isPending = false
            })
            .addCase(addCandidateThunk.rejected, (state, action) => {
                state.candidateStatus = action.payload.res
                state.isPending = false
                state.error = true
            })      // registering candidates to the poll

            .addCase(getPollDetailsThunk.pending, (state) => {
                state.isPending = true
            })
            .addCase(getPollDetailsThunk.fulfilled, (state, action) => {
                state.pollDetailsStatus = action.payload.res
                if (action.payload.res === 200) {
                    const list = action.payload.polls
                    state.pollData = list.filter(item => item.candidates.length > 1)
                    console.log(state.pollData)
                }
                state.isPending = false
            })
            .addCase(getPollDetailsThunk.rejected, (state, action) => {
                state.pollDetailsStatus = action.payload.res
                state.isPending = false
                state.error = true
            })      // getting polls data

            .addCase(getVSPS_THUNK.pending, (state) => {
                state.isPending = true
            })
            .addCase(getVSPS_THUNK.fulfilled, (state, action) => {
                state.vspsStatus = action.payload.res
                if (state.vspsStatus === 200) {
                    state.vsps = action.payload.data
                    console.log(JSON.stringify(state.vsps))
                    console.log(JSON.stringify(action.payload.data))
                }
                state.isPending = false
            })
            .addCase(getVSPS_THUNK.rejected, (state, action) => {
                state.vspsStatus = action.payload.res
                state.isPending = false
                state.error = true
            })      // vote status poll snapshot handled above

            .addCase(getGlobalPIDSList.pending, (state) => {
                state.isPending = true
            })
            .addCase(getGlobalPIDSList.fulfilled, (state, action) => {
                state.gGPIDSstatus = action.payload.res
                if (state.gGPIDSstatus == 200) {
                    state.gGPIDS = action.payload.data
                    p(state.gGPIDS)
                }
                state.isPending = false
            })
            .addCase(getGlobalPIDSList.rejected, (state, action) => {
                state.gGPIDSstatus = action.payload.res
                state.isPending = false
                state.error = true
            })      // global PID list is fetched or handled above

            .addCase(getVoterPIDS.pending, (state) => {
                state.isPending = true
            }).
            addCase(getVoterPIDS.fulfilled, (state, action) => {
                state.gVPIDSstatus = action.payload.res
                if (state.gVPIDSstatus === 200) {
                    state.gVPIDS = action.payload.data
                }
                state.isPending = false
            }).
            addCase(getVoterPIDS.rejected, (state, action) => {
                state.isPending = false
                state.gVPIDSstatus = action.payload.res
                state.error = true

            })      // voter specific PID list is fetched or handled above

            .addCase(addVoterPIDS.pending, (state) => {
                state.isPending = true
            }).
            addCase(addVoterPIDS.fulfilled, (state, action) => {
                state.addPIDStatus = action.payload.res
                state.isPending = false
            }).
            addCase(addVoterPIDS.rejected, (state, action) => {
                state.addPIDStatus = action.payload.res
                state.isPending = false
                state.error = true
            })      // pid will get added to voter section

            .addCase(getPoll.pending, (state) => {
                state.isPending = true
            }).
            addCase(getPoll.fulfilled, (state, action) => {
                state.pollStatus = action.payload.res
                if (state.pollStatus == 200) {
                    state.poll = action.payload.data
                    p(`poll details ${JSON.stringify(state.poll)}`)
                }
                state.isPending = false
            }).
            addCase(getPoll.rejected, (state, action) => {
                state.pollStatus = action.payload.res
                state.isPending = false
                state.error = true
            })      // getting poll details

            .addCase(gpdfvTHUNK.pending, (state) => {
                state.isPending = true
            }).
            addCase(gpdfvTHUNK.fulfilled, (state, action) => {
                state.gpdfvStatus = action.payload.res
                if (state.gpdfvStatus === 200) {
                    state.gpdfv = action.payload.data
                    p(`gpdfv data ::: ${JSON.stringify(state.gpdfv)}`)
                }
                state.isPending = false
            }).
            addCase(gpdfvTHUNK.rejected, (state, action) => {
                state.gpdfv = action.res
                state.isPending = false
                state.error = true
            })      // getting poll data for voter

            .addCase(votingTHUNK.pending, (state) =>{
                state.isPending = true
            }).
            addCase(votingTHUNK.fulfilled, (state, action)=> {
                state.voteStatus = action.payload.res
                state.isPending = false
            }).
            addCase(votingTHUNK.rejected, (state, action) =>{
                state.voteStatus = action.payload.res
                state.isPending = false
                state.error = true
            })  // voting now
    }
})


// S E L E C T O R S
export const getUserType = (state) => state.main.userType

export const getDashViewSelector = (state) => state.main.dashView

export const isSignedInSelector = (state) => state.main.isSignedIn

export const selectIsPending = (state) => state.main.isPending


export const selectRegStatus = (state) => state.main.regStatus
export const selectRegSuccess = (state) => state.main.regSuccess


export const selectAuthStatus = (state) => state.main.authStatus
export const selectAuthSuccess = (state) => state.main.authSuccess

export const selectCreatorData = (state) => state.main.creator
export const selectVoterData = (state) => state.main.voter

export const pollRegStatus = (state) => state.main.pollRegStatus
export const currentPollId = (state) => state.main.pid

export const candidateStatus = (state) => state.main.candidateStatus

export const getPollData = (state) => state.main.pollData
export const pollPendingStatus = (state) => state.main.pollDetailsStatus

export const getVSPSSelector = (state) => state.main.vsps
export const getVSPSstatusSelector = (state) => state.main.vspsStatus

export const shouldNavigate = (state) => state.main.toPolls

//voter specific
export const gGPIDSSelector = (state) => state.main.gGPIDS
export const gGPIDSstatusSelector = (state) => state.main.gGPIDSstatus

export const gVPIDSSelector = (state) => state.main.gVPIDS
export const gVPIDSstatus = (state) => state.main.gVPIDSstatus

export const aVoterPIDSStatusSelector = (state) => state.main.addPIDStatus

export const pPollStatusSelector = (state) => state.main.pollStatus
export const pGetPollSelector = (state) => state.main.poll

export const gpdfvStatusSelector = (state) => state.main.gpdfvStatus
export const gpdfvArrSelector = (state) => state.main.gpdfv

export const voteStatus = (state) => state.main.voteStatus


export const selectError = (state) => state.main.error

// A C T I O N  C R E A T O R S


export const {
    logIn,
    logOut,
    setDashView,
    resetRegStatus,
    resetAuthStatus,
    turnPidNull,
    resetPollRegStatus,
    handleToPolls,
    manageAfterSubscribe
} = mainSlice.actions



// E X P O R T I N G   R E D U C E R S

const mainReducers = mainSlice.reducer

export default mainReducers