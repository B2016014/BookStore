import React from 'react'

const PaymentResult = ({result}) => {
    return (
        <div>
            {
                (result=='cancel')?
                (<div><p>Forgot to add something to your cart? Shop around then come back to pay!</p></div>):
                (<div>
                    <p>We appreciate your business! If you have any questions, please email
                    <a href="mailto:orders@example.com">orders@example.com</a>.</p>
                </div>)
            }
        </div>
    )
}

export default PaymentResult