/**
 * User: YCotov
 * Date: 28.09.13
 */
//globalConfig = globalConfig || {};
global.globalConfComp.getTaskTemplate = function()
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

global.globalConfComp.getNextTaskInd = function()
{

    return "10";
}