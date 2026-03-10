# Price Ladder App

## State Strategy

In this case, it was not necessary to use global state. By utilizing a custom hook, we have direct access to the data within the `PriceGrid` component, and currently, there is no need to access this data from other parts of the application. This approach is sufficient for our needs. Within the `FlashingCell` component, we use local state to track the value of each update. Additionally, we use a `useRef` to store the previous state of the cell, which allows us to determine how to correctly style the cell during an update.

## Scaling the UI

If the `PriceGrid` component were to be used across multiple workspaces simultaneously, I would consider implementing the Context API to manage the data from `useMockPriceFeed`. This would allow us to efficiently share and reuse the exact same data feed across all instances of the component, maintaining high performance. Furthermore, I would introduce props to allow consumers to customize the styling of these components, ensuring they can seamlessly integrate into various workspace designs.

## Error Handling

To detect data lag or desynchronization, I would rely on sequence numbers or timestamps included in each WebSocket message. If an update arrives with a missing sequence number or a timestamp older than an acceptable latency threshold, the client can detect that the local order book is out of sync with the live market feed.

When a desynchronization is detected, the client should pause incremental updates and request a fresh order book snapshot from the backend via a REST endpoint. Once the snapshot is received, the local state is replaced, and the WebSocket updates can safely resume.

From a UI perspective, I would expose the feed connection status to the user (e.g., “Live”, “Delayed”, or “Reconnecting”) to ensure transparency and prevent traders from acting on stale data.
