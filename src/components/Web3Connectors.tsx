import styles from '../styles/Connectors.module.css'
import { connectors, getConnectorInfo, Web3Connector } from '../connectors'
import { useCallback } from 'react'




function Connector({ web3Connector }: { web3Connector: Web3Connector }) {
  const [connector, hooks] = web3Connector
 
  const isActive = hooks.useIsActive()
  const onClick = useCallback(() => {
    if (isActive) {
      connector.deactivate()
    } else {
      connectors.forEach(([connector]) => connector.deactivate())
      connector.activate()
    }
  }, [connector, isActive])

  const { name, logo } = getConnectorInfo(connector)
  
  return (
    <button className={styles.walletButtonConnector} onClick={onClick}>
    <div className={styles.connector}>
      <div className={styles.name}>
        <img src={logo} alt={`${name} Logo`} className={styles.logo} />
        <span>{name}</span>
      </div>
      <div className={styles.disconnect}>
      <div >{isActive ? 'Disconnect' : 'Connect'}</div>
      </div>
      <svg className={[styles.status, isActive && styles.active].join(' ')} viewBox="0 0 2 2">
        <circle cx={1} cy={1} r={1} />
      </svg>
    </div>
    </button>
    
  )
}

export default function Connectors() {
  return (
    <div className={styles.connectors}>
      {connectors.map((web3Connector, index) => (
        <Connector key={index} web3Connector={web3Connector} />
      ))}
    </div>
  )
}
