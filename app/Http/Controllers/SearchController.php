<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Elastic\Elasticsearch\ClientBuilder;

use function GuzzleHttp\json_decode;

class SearchController extends Controller
{

    public function ElasticInfo()
    {
        
        $client = ClientBuilder::create()
            ->setHosts(['http://104.251.217.92:9200'])
            ->build();

        // Info API
        $response = $client->info();
        echo $response['version']['number'];
        //return response()->json(['data' => json_encode($response)],200);
    }
    public function ElasticSearch(Request $request){
        $search= $request->get('search');
        
        $client = ClientBuilder::create()
            ->setHosts(['http://104.251.217.92:9200'])
            ->build();
        $params = [
            'index' => 'datadoc_index',
            'body'  => [
                'query' => [
                    'match' => [
                        'sapo' => $search,
                    ]
                ]
            ]
        ];
        $response = $client->search($params);
        return response()->json(['data'=>[
            'total'=>$response['hits']['total']['value'],
            'took' => $response['hits']['max_score'],
            'documents' => $response['hits']['hits']
        ]],200);
    }
}
