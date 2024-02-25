import React, {useState} from 'react'
export const UserEmailContext = React.createContext()
const UserEmailContextCoponent = ({children}) => {
    const [userEmail, setUserEmail] = useState('')
  return (
    <UserEmailContext.Provider value={{userEmail, setUserEmail}} >{children}</UserEmailContext.Provider>
  )
}

export default UserEmailContextCoponent