<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Elastic\Elasticsearch\ClientBuilder;

use function GuzzleHttp\json_decode;

class SearchController extends Controller
{

    public function ElasticInfo()
    {
        $host = env('DB_ELASTIC');
        $client = ClientBuilder::create()
            ->setHosts(["{$host}:9200"])
            ->build();

        // Info API
        $response = $client->info();
        echo $response['version']['number'];
        //return response()->json(['data' => json_encode($response)],200);
    }
    public function ElasticSearchDataDoc(Request $request)
    {
        $search = $request->get('search');
        $host = env('DB_ELASTIC');
        $client = ClientBuilder::create()
            ->setHosts(["{$host}:9200"])
            ->build();
        $params = [
            'index' => 'datadoc_index',
            'body'  => [
                'query' => [
                    'multi_match' => [
                        'query' => $search,
                        'fields' => ['sapo', 'content']
                    ]
                ]
            ]
        ];
        $response = $client->search($params);
        return response()->json(['data' => [
            'total' => $response['hits']['total']['value'],
            'took' => $response['hits']['max_score'],
            'documents' => $response['hits']['hits']
        ]], 200);
    }
    public function ElasticSearchFacebook(Request $request)
    {
        $search = $request->get('search');
        $host = env('DB_ELASTIC');
        $client = ClientBuilder::create()
            ->setHosts(["{$host}:9200"])
            ->build();
        $params = [
            'index' => ['post_index', 'comment_index'],
            'body'  => [
                'query' => [
                    'match' => [
                        'content' => $search,  
                    ]
                ]
            ]
        ];
        $response = $client->search($params);
        return response()->json(['data' => [
            'total' => $response['hits']['total']['value'],
            'took' => $response['hits']['max_score'],
            'documents' => $response['hits']['hits']
        ]], 200);
    }
}
