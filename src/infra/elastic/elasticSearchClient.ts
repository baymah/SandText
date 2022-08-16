import { Client, Serializer } from "@elastic/elasticsearch";
import { SerializationError } from "@elastic/elasticsearch/lib/errors";
import jc from "json-cycle";
import { config } from "../../config";

const { nodeUrl } = config.elastic;

class CircularSerializer extends Serializer {
    serialize(object: any) {
        // debug("Serializing", object);
        let json;
        try {
            json = JSON.stringify(jc.decycle(object));
        } catch (err: any) {
            throw new SerializationError(err.message, object);
        }
        return json;
    }
}

export const esClient = new Client({
    node: nodeUrl,
    Serializer: CircularSerializer,
});
