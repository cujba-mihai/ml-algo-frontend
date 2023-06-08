import { Card, Typography, List } from 'antd';

const { Title } = Typography;

const PrettyResponse = ({result}) => {
    if (!result) return null;
    let finalResult = {
        etapele: result.etapele,
        concluzie: result.concluzie
    }
    return (
        <Card bordered={false}>
            {Object.entries(finalResult).map(([key, values]) => (
                <div key={key}>
                    <Title level={3}>{key.toUpperCase()}</Title>
                    {Array.isArray(values) ? (
                        <List
                            size="small"
                            bordered
                            dataSource={values}
                            renderItem={(item) => (
                                <List.Item>
                  <pre style={{ whiteSpace: 'pre-wrap' }}>
                    {item.calcul_incredere || JSON.stringify(item, null, 2)}
                  </pre>
                                </List.Item>
                            )}
                        />
                    ) : (
                        Object.entries(values).map(([step, values]) => (
                            <div key={step}>
                                <Title level={4}>{step.toUpperCase()}</Title>
                                <List
                                    size="small"
                                    bordered
                                    dataSource={values}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <pre style={{ whiteSpace: 'pre-wrap' }}>{item}</pre>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        ))
                    )}
                </div>
            ))}
        </Card>
    );
};

export default PrettyResponse;