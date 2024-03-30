import { Helmet } from 'react-helmet-async'

const MetaData = ({title}) => {
  return (
    <Helmet>
        <title>{`${title} - Asalt code`}</title>
    </Helmet>
  )
}

export default MetaData