import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from '../api/posts'

/* const assetsAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
}) */

export const getSecurityMaster = createAsyncThunk('legacy/getSecurityMaster', async (securityMaster) => {
        const params = {ClaFamiliaCliente: 1, ClaSecurityMaster: securityMaster.value};
      /*   try { */
            const response = await axios.post('legacy/getSecurityMaster',
                            params,
                            {
                            headers: {
                                        'Authorization' : 'Bearer token', /*  `Bearer ${token}`, */
                                        'Content-Type': 'application/json'
                                    },
                            withCredentials: false
                            });
         
            return response.data;
/*         } catch (err) {
            console.log(err);
        } */
})

export const getHoldings = createAsyncThunk('legacy/getHoldings', async () => {
    const params = {ClaFamiliaCliente: 1, ClaSecurityMaster: 1};
   /*  try { */
        const response = await axios.post('legacy/getHoldings',
                        params,
                        {
                        headers: {
                                    'Authorization' : 'Bearer token', /*  `Bearer ${token}`, */
                                    'Content-Type': 'application/json'
                                },
                        withCredentials: false
                        });
     
        return response.data?.ResultSet;
   /*  } catch (err) {
        console.log(err);
    } */
})

 const initialState = {
    assets: [],
    status: 'idle',
    error: null
}   

/* const initialState = assetsAdapter.getInitialState({
    status: 'idle',
    error: null
}) */

export const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers:{
    },  
    extraReducers (builder) {
        builder
            .addCase(getSecurityMaster.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getSecurityMaster.fulfilled, (state, action) => {
                state.status = 'succeeded'
               /*  console.log(action.payload) */
                state.assets = action.payload
               /*   state.assets.push(action.payload)   */
              /*  assetsAdapter.upsertMany(state, action.payload) */
            })
            .addCase(getSecurityMaster.rejected, (state, action) => {
                state.status = 'failed'
                state.error  = action.error.message
                console.log('rejected')
            })
    }
})

export const getAssetStatus = (state) => state.asset.status;
export const getAssetError = (state) => state.asset.error;

export default assetSlice.reducer;