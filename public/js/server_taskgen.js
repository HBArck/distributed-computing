/**
 * User: YCotov
 * Date: 28.09.13
 */
Config = Config || {};
Config.getTaskTemplate = function()
//function getTaskTemplate()
{
    return "function getResult(){"
       +" for (var i=3; i < {ind}; i++)"
        +"{"
            +"if ({ind} % i != 0 )"
            +"{"
                +"return false;"
            +"}"
        +"}"
        +"return true;"
    +"}";
}

Config.getNextTaskInd = function()
{

    return "10";
}