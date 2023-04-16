import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_BID } from '../../utils/mutations';
import Auth from '../../utils/auth';

const BidForm = ( { postId } ) => {
  const [amount, setAmount] = useState('');
  const [addBid, { error }] = useMutation(ADD_BID);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        const { data }  = await addBid({
            variables: {
                postId,
                amount,

            },
        });

        setAmount('');
        window.location.reload();
    } catch (err) {
        console.error('Error:          '+err);
    }
  }




  return (
    <div className='bidform'>
        <h1 className='bidformtitle'>Bid on this vehicle</h1>
        {Auth.loggedIn() ? (
            <>
            <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
            >
                <div>
                    {/* <input className='bidformname' type='text' placeholder='Your Name'></input> */}
                    <label>
                        Your Bid:
                        <input
                        className='bidformbid'
                        id='bidAmount'
                        // defaultValue={0}
                        value={amount}
                        type='text'
                        // placeholder='Your Bid'
                        name='amount'
                        onChange={e => setAmount(~~e.target.value)}
                        ></input>
                    </label>

                    {/* <input className='bidformmsg' type='text' placeholder='Add a message (optional)'></input> */}



                </div>

                <button className='submitbtn' id='bidformsubmitbtn' type='submit'>Add Bid</button>

                {/* {error && (
                    <div className="col-12 my-3 bg-danger text-white p-3">
                        {error.message}
                    </div>
                )} */}
            </form>
        </>
        ) : (
            <p>
                You need to be logged in to bid
            </p>
        )
        }
        </div>
  )
}

export default BidForm;